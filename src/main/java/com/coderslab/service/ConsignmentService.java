/**
 * 
 */
package com.coderslab.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderslab.model.Consignment;
import com.coderslab.repository.ConsignmentRepository;

/**
 * @author Zubayer Ahamed
 *
 */
@Service
public class ConsignmentService {

	@Autowired
	ConsignmentRepository consignmentRepository;

	public void save(Consignment consignment) {
		consignmentRepository.save(consignment);
	}

	public List<Consignment> findAll() {
		return consignmentRepository.findAll();
	}
}
