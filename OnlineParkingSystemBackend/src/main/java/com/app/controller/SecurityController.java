package com.app.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.DeleteParkingDto;
import com.app.dto.LoginForm;
import com.app.dto.UserDto;
import com.app.pojos.ParkingDetails;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.services.AdminService;
import com.app.services.SecurityService;
import com.app.services.UserService;


@RestController
@RequestMapping("/security")
@CrossOrigin
public class SecurityController {
	
	@Autowired
	private SecurityService securityService;
	
	//Delete booking 
	@DeleteMapping("/deletebooking")
	public String deleteBooking(@RequestBody DeleteParkingDto deleteParkingDto)
	{
		return securityService.deleteParking(deleteParkingDto.getCarId());
	}

}
