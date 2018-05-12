/**
 * 
 */
package com.coderslab.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderslab.model.Address;
import com.coderslab.repository.AddressRepository;

/**
 * @author Zubayer Ahamed
 *
 */
@Service
public class AddressService {

	@Autowired
	private AddressRepository addressRepository;

	public void save(Address address) {
		addressRepository.save(address);
	}

	public List<Address> findAll() {
		return addressRepository.findAll();
	}

	public Address findOne(Integer addressId) {
		return addressRepository.findOne(addressId);
	}
}
