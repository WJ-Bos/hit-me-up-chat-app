package wbos.middleware.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import wbos.middleware.service.GatewayService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final GatewayService gatewayService;

    @PostMapping("/signup")
    public Mono<ResponseEntity<Object>> signup(@RequestBody Object requestBody) {
        return gatewayService.forwardToBackend(
                "/api/v1/chatApp/auth/signup",
                "POST",
                requestBody,
                null
        );
    }

    @PostMapping("/signin")
    public Mono<ResponseEntity<Object>> signin(@RequestBody Object requestBody) {
        return gatewayService.forwardToBackend(
                "/api/v1/chatApp/auth/signin",
                "POST",
                requestBody,
                null
        );
    }
}