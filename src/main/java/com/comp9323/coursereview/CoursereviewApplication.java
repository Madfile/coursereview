package com.comp9323.coursereview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class CoursereviewApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // start class for tomcat initialization
        return builder.sources(CoursereviewApplication.class);
    }

//    public static void main(String[] args) {
//        SpringApplication.run(CoursereviewApplication.class, args);
//    }
}
