package wbos.starterchatapp.controllers.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wbos.starterchatapp.dtos.requests.CreateUserRequest;
import wbos.starterchatapp.dtos.requests.SignInRequest;
import wbos.starterchatapp.dtos.response.SignInResponse;
import wbos.starterchatapp.dtos.response.SignUpResponse;
import wbos.starterchatapp.services.UserService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> createUser(@Valid @RequestBody CreateUserRequest request){
        return ResponseEntity.ok().body(userService.createUser(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<SignInResponse> signIn(@Valid @RequestBody SignInRequest request) {
        return ResponseEntity.ok().body(userService.signIn(request));
    }
}
