package wbos.middleware.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CachedUser implements Serializable {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
}