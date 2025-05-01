package com.week6.allOfWeek6.Filter;

import com.sun.net.httpserver.HttpsServer;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException{

        HttpServletRequest req = (HttpServletRequest) request;
        HttpSession session = req.getSession(false);

        String path = req.getRequestURI();

        // allow signup , login
        if(path.contains("/api/auth/signup") || path.contains("/api/auth/login") || path.contains("/api/auth/allUser")){
            chain.doFilter(request, response);
            return;
        }

        // protect other routes
        if(session != null  && session.getAttribute("user")!=null){
            chain.doFilter(request, response);
            return;
        }
        else{
            response.setContentType("text/plain");
            response.getWriter().write("Unauthorized - Please login first!");
        }
    }
}
