package com.coderslab.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coderslab.model.DriverLocation;

/**
 * 
 * @author Zubayer Ahamed
 *
 */
@Repository
@Transactional
public interface DriverLocationrepository extends JpaRepository<DriverLocation, Integer>{

}
