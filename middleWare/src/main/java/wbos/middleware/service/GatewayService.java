package wbos.middleware.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import wbos.middleware.dto.user.CachedUser;
import wbos.middleware.service.cache.UserCacheService;

@Service
@RequiredArgsConstructor
public class GatewayService {

    private final WebClient webClient;
    private final UserCacheService userCacheService;

    public CachedUser getCachedUser(Long userId) {
        return userCacheService.getUserById(userId);
    }

    public Mono<ResponseEntity<Object>> forwardToBackend(
            String path,
            String method,
            Object body,
            CachedUser user) {

        WebClient.RequestBodySpec request = webClient
                .method(org.springframework.http.HttpMethod.valueOf(method))
                .uri(path)
                .header("X-User-Id", user.getId().toString())
                .header("X-Username", user.getUsername());

        if (body != null) {
            request.bodyValue(body);
        }

        return request
                .retrieve()
                .toEntity(Object.class)
                .onErrorResume(error -> {
                    return Mono.just(ResponseEntity.status(500)
                            .body("Error calling backend: " + error.getMessage()));
                });
    }
}