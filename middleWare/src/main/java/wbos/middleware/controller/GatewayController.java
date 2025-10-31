package wbos.middleware.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import wbos.middleware.dto.user.CachedUser;
import wbos.middleware.service.GatewayService;
import wbos.middleware.util.JwtUtil;

@RestController
@RequestMapping("/gateway")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GatewayController {

    private final JwtUtil jwtUtil;
    private final GatewayService gatewayService;

    /**
     * Proxy endpoint for sending messages
     * Client calls: POST /api/v1/gateway/messages
     */
    @PostMapping("/messages")
    public Mono<ResponseEntity<Object>> sendMessage(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Object requestBody) {

        // Validate token and get cached user
        CachedUser user = validateAndGetUser(authHeader);

        // Forward request to backend with user context
        return gatewayService.forwardToBackend(
                "/api/v1/chatApp/messages",
                "POST",
                requestBody,
                user
        );
    }

    /**
     * Proxy endpoint for getting messages
     * Client calls: GET /api/v1/gateway/messages
     */
    @GetMapping("/messages")
    public Mono<ResponseEntity<Object>> getMessages(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) Long recipientId) {

        CachedUser user = validateAndGetUser(authHeader);

        String path = recipientId != null
                ? "/api/v1/chatApp/messages?recipientId=" + recipientId
                : "/api/v1/chatApp/messages";

        return gatewayService.forwardToBackend(path, "GET", null, user);
    }

    /**
     * Proxy endpoint for any other backend requests
     * Client calls: ANY /api/v1/gateway/chatApp/*
     */
    @RequestMapping("/chatApp/**")
    public Mono<ResponseEntity<Object>> proxyToChatApp(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody(required = false) Object requestBody,
            @RequestParam(required = false) String params) {

        CachedUser user = validateAndGetUser(authHeader);

        // Extract the path after /gateway
        String path = "/api/v1/chatApp" + params;

        return gatewayService.forwardToBackend(path, "POST", requestBody, user);
    }

    private CachedUser validateAndGetUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid authorization header");
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or expired token");
        }

        Long userId = jwtUtil.extractUserId(token);

        // Get user from cache (or DB if not cached)
        return gatewayService.getCachedUser(userId);
    }
}