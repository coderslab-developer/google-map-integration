/**
 * 
 */
package com.coderslab.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

/**
 * @author Zubayer Ahamed
 *
 */
@Data
@Entity
@Table(name = "driverLocation")
public class DriverLocation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "driverName", length = 100)
	private String driverName;

	@Column(name = "driverId")
	private Integer driverId;

	@Column(name = "latitude", length = 100)
	private String latitude;

	@Column(name = "longitude", length = 100)
	private String longitude;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "locationTime", nullable = false)
	private Date locationTime;

}
