/**
 * 
 */
package com.coderslab.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderslab.model.User;
import com.coderslab.repository.UserRepository;

/**
 * @author Zubayer Ahamed
 *
 */
@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public void save(User user) {
		userRepository.save(user);
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User findOne(Integer userId) {
		return userRepository.findOne(userId);
	}
}
