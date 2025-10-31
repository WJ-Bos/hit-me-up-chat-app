package wbos.middleware.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wbos.middleware.dto.response.TokenValidationResponse;
import wbos.middleware.util.JwtUtil;

@Service
@RequiredArgsConstructor
public class TokenValidationService {

    private final JwtUtil jwtUtil;

    public TokenValidationResponse validateToken(String token) {
        try {
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);
                Long userId = jwtUtil.extractUserId(token);

                return TokenValidationResponse.builder()
                        .valid(true)
                        .username(username)
                        .userId(userId)
                        .message("Token is valid")
                        .build();
            } else {
                return TokenValidationResponse.builder()
                        .valid(false)
                        .message("Token is expired")
                        .build();
            }
        } catch (Exception e) {
            return TokenValidationResponse.builder()
                    .valid(false)
                    .message("Invalid token: " + e.getMessage())
                    .build();
        }
    }
}