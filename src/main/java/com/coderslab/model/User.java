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
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userId", nullable = false, unique = true)
	private Integer userId;

	@Column(name = "userName", length = 100)
	private String userName;

	@Column(name = "userType", length = 100)
	private String userType;

	@Column(name = "vehicleType", length = 100)
	private String vehicleType;

	@Column(name = "status", columnDefinition = "BOOLEAN")
	private boolean status;

	@Column(name = "latitude", length = 100)
	private String latitude;

	@Column(name = "longitude", length = 100)
	private String longitude;
}
