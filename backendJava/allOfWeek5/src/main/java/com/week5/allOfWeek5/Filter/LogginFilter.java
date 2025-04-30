package com.week5.allOfWeek5.Filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicInteger;

// week 5.1 - ASSIGNMENT 2

@Component
public class LogginFilter implements Filter {

    // ASSIGNMENT 3 - COUNTER
    // instead of int counter = 0, cause
    /*
        When multiple users hit the server at the same time (concurrent requests),
        normal int is NOT thread-safe — meaning:

        Two requests can read count = 10 at the same time

        Both increment and set count = 11 (one increment is lost!)

        Final count is wrong 😵
     */
    public static AtomicInteger requestCount = new AtomicInteger(0);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
    throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String method = req.getMethod();
        String url = req.getRequestURI();
        LocalDateTime timestamp = LocalDateTime.now();

        //increment the count
        requestCount.incrementAndGet();

        System.out.println("[LOG] "+method+" "+url+" at "+ timestamp);
        chain.doFilter(request, response);
    }
}
