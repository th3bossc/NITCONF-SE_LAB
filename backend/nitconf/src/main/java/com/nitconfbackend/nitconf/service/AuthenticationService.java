package com.nitconfbackend.nitconf.service;

import java.util.ArrayList;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nitconfbackend.nitconf.models.Role;
import com.nitconfbackend.nitconf.models.Paper;
import com.nitconfbackend.nitconf.models.User;
import com.nitconfbackend.nitconf.repositories.UserRepository;
import com.nitconfbackend.nitconf.types.AuthenticationRequest;
import com.nitconfbackend.nitconf.types.AuthenticationResponse;
import com.nitconfbackend.nitconf.types.RegisterRequest;

// import com.example.demo.config.JwtService;
// import com.example.demo.models.Role;
// import com.example.demo.models.User;
// import com.example.demo.respository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository repository;
        private final PasswordEncoder encoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final EmailSender emailSender;

        public AuthenticationResponse register(RegisterRequest request) {
                var user = User.builder()
                                .firstName(request.getFirstName())
                                .lastName(request.getLastName())
                                .email(request.getEmail())
                                .password(encoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .phoneNumber(request.getPhoneNumber())
                                .papers(new ArrayList<Paper>())
                                .isVerified(false)
                                .build();
                if (user != null) {
                        repository.save(user);
                        var jwtToken = jwtService.generateToken(user);
                        emailSender.sendEmail(
                                        "NITCONF",
                                        request.getEmail(),
                                        "verify email",
                                        "click the below link to verify your email \n http://localhost:8080/api/email/verify/"
                                                        + jwtToken);

                        return AuthenticationResponse.builder()
                                        .token(jwtToken)
                                        .build();
                }
                return null;
        }

        public AuthenticationResponse login(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = repository.findByEmail(request.getEmail()).orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }
}