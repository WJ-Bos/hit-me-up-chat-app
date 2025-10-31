package wbos.middleware.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wbos.middleware.dto.request.TokenValidationRequest;
import wbos.middleware.dto.response.TokenValidationResponse;
import wbos.middleware.service.TokenValidationService;

@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TokenController {

    private final TokenValidationService tokenService;

    @PostMapping("/validate")
    public ResponseEntity<TokenValidationResponse> validateToken(
            @Valid @RequestBody TokenValidationRequest request) {
        return ResponseEntity.ok(tokenService.validateToken(request.getToken()));
    }

    @GetMapping("/validate")
    public ResponseEntity<TokenValidationResponse> validateTokenFromHeader(
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok(tokenService.validateToken(token));
    }
}