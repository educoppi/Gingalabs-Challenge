package br.com.GerenciamentoDeVendas.repository;

import br.com.GerenciamentoDeVendas.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.username LIKE :username AND u.email LIKE :email")
    Iterable<User> authentication(String username, String email);
}
