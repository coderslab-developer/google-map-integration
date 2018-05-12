/**
 * 
 */
package com.coderslab.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coderslab.model.Consignment;

/**
 * @author Zubayer Ahamed
 *
 */
@Repository
@Transactional
public interface ConsignmentRepository extends JpaRepository<Consignment, Integer>{

}
