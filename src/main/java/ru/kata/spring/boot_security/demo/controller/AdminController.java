package ru.kata.spring.boot_security.demo.controller;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin/user")
public class AdminController {


    private final UserService userService;



    public AdminController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping
    public String mainPage(Model model, Principal principal){
        User user = (User) userService.loadUserByUsername(principal.getName());
        model.addAttribute("user", user);
        //model.addAttribute("users", userService.getAllUsers());
        return "admin";
    }

}
