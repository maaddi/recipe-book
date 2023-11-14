package com.maaddi.recipebook.mapper;

import com.maaddi.recipebook.domain.DTO.JwtResponseDto;
import com.maaddi.recipebook.domain.DTO.SignupRequestDto;
import com.maaddi.recipebook.domain.DTO.UserDto;
import com.maaddi.recipebook.domain.entities.Role;
import com.maaddi.recipebook.domain.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = RoleMapper.class, componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    User signupRequestDtoToUser(SignupRequestDto signupRequestDto);

    UserDto userToUserDto(User user);
}
