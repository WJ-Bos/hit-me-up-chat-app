package wbos.starterchatapp.controllers.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import wbos.starterchatapp.dtos.requests.CreateUserRequest;
import wbos.starterchatapp.dtos.response.SignUpResponse;
import wbos.starterchatapp.services.UserService;

@RestController("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> createUser(@Valid @RequestBody CreateUserRequest request){
        return ResponseEntity.ok().body(userService.createUser(request));
    }
}
