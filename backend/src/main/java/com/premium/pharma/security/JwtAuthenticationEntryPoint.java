package com.premium.pharma.security;

import java.io.PrintWriter;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint{

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException, java.io.IOException {
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        PrintWriter writer = httpServletResponse.getWriter();
        writer.println("Access Denide ! " + e.getMessage());
    }
}
