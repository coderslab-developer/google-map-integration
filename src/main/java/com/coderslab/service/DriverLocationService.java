/**
 * 
 */
package com.coderslab.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderslab.model.DriverLocation;
import com.coderslab.repository.DriverLocationrepository;

/**
 * @author Zubayer Ahamed
 *
 */
@Service
public class DriverLocationService {

	@Autowired
	DriverLocationrepository driverLocationrepository;

	public void save(DriverLocation driverLocation) {
		driverLocationrepository.save(driverLocation);
	}

	public List<DriverLocation> findAll() {
		return driverLocationrepository.findAll();
	}
}
