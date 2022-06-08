package ru.kata.spring.boot_security.demo.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.mapper.UserMapper;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;



@RestController
@RequestMapping("/api")
public class RestAdminController {

    private final UserService userService;

    private final RoleService roleService;

    private final UserMapper userMapper;

    public RestAdminController(UserService userService, RoleService roleService, UserMapper userMapper) {
        this.userService = userService;
        this.roleService = roleService;
        this.userMapper = userMapper;
    }

    @GetMapping("/current")
    public ResponseEntity<User> currentUser(Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        return ResponseEntity.ok().body(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> allUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> user(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @PostMapping("/new")
    public ResponseEntity<User> newUser(@RequestBody UserDto userDto) {
        User user = userMapper.dtoToEntity(userDto);
        userService.saveUser(user);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/edit")
    public ResponseEntity<User> update(@RequestBody UserDto userDto) {
        User user = userMapper.dtoToEntity(userDto);
        userService.updateUser(user);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        userService.removeUser(id);
    }

}
