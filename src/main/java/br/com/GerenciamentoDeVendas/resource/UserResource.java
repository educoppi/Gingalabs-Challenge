package br.com.GerenciamentoDeVendas.resource;

import br.com.GerenciamentoDeVendas.entity.User;
import br.com.GerenciamentoDeVendas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserResource {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public Iterable<User> findAll(){
        return userRepository.findAll();
    }

    @GetMapping("/{username}/{email}")
    public Iterable<User> authentication(@PathVariable String username, @PathVariable String email){
        return userRepository.authentication(username, email);
    }
}
