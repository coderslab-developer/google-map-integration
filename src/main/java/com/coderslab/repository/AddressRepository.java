package com.coderslab.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coderslab.model.Address;

@Repository
@Transactional
public interface AddressRepository extends JpaRepository<Address, Integer>{

}
