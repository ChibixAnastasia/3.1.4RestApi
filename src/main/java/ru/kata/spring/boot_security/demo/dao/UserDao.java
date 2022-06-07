package ru.kata.spring.boot_security.demo.dao;


import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {

    void delete(long id);

    void save(User user);

    List<User> getAllUsers();

    User getUserById(long id);

    void update(User user);

    User getUserByUsername(String username);
}
