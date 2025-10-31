package wbos.starterchatapp.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignInResponse {

    private String token;

    private String tokenType = "Bearer";

    private Long userId;

    private String username;

    private String email;

    private String message;
}
