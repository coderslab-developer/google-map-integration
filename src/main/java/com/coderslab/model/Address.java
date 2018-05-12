/**
 * 
 */
package com.coderslab.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**
 * @author Zubayer Ahamed
 *
 */
@Data
@Entity
@Table(name = "address")
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "addressId", nullable = false, unique = true)
	private Integer addressId;

	@Column(name = "company", length = 200)
	private String company;

	@Column(name = "country", length = 200)
	private String country;

	@Column(name = "city", length = 200)
	private String city;

	@Column(name = "latitude", length = 100)
	private String latitude;

	@Column(name = "longitude", length = 100)
	private String longitude;
}
