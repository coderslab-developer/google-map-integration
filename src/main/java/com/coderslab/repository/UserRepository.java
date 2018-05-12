package com.coderslab.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coderslab.model.User;

/**
 * 
 * @author Zubayer Ahamed
 *
 */
@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer>{

}
