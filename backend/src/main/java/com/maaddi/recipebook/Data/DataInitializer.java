package com.maaddi.recipebook.Data;

import jakarta.annotation.PostConstruct;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final JdbcTemplate jdbcTemplate;

    public DataInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void init() {
        if (!dataExists()) {
            insertDefaultData();
        }
    }
    private boolean dataExists() {
        String query = "SELECT COUNT(*) FROM roles";
        Integer count = jdbcTemplate.queryForObject(query, Integer.class);
        return count != null && count > 0;
    }

    private void insertDefaultData() {
        jdbcTemplate.update("INSERT INTO roles (id, name) VALUES (?, ?)", 1, "ROLE_USER");
        jdbcTemplate.update("INSERT INTO roles (id, name) VALUES (?, ?)", 2, "ROLE_ADMIN");
    }
}
