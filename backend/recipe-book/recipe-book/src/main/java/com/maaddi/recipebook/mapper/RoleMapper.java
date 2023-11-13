package com.maaddi.recipebook.mapper;

import com.maaddi.recipebook.domain.entities.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    @Mapping(source = "value", target = "name")
    Role stringToRole(String value);

    default String roleToString(Role role) {
        return (role == null) ? null : role.getName().toString();
    }
}
