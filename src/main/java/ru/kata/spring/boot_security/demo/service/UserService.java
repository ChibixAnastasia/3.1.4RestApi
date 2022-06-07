package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;


public interface UserService extends UserDetailsService {

    void saveUser(User user);
    void removeUser(long id);
    void updateUser(User user);
    List<User> getAllUsers();
    User getUserById(long id);

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
