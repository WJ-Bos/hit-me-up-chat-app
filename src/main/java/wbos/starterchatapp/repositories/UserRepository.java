package wbos.starterchatapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import wbos.starterchatapp.entities.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
