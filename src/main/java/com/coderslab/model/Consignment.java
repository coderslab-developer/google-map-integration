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
@Table(name = "job")
public class Consignment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "jobId", nullable = false, unique = true)
	private Integer jobId;

	@Column(name = "hawbNumber", length = 200)
	private String hawbNumber;

	@Column(name = "userId")
	private Integer userId;

	@Column(name = "collectionAddressId")
	private Integer collectionAddressId;

	@Column(name = "deliveryAddressId")
	private Integer deliveryAddressId;

	@Column(name = "delivered", columnDefinition = "BOOLEAN")
	private boolean delivered;

	@Column(name = "received", columnDefinition = "BOOLEAN")
	private boolean received;

	@Column(name = "driverAssigned", columnDefinition = "BOOLEAN")
	private boolean driverAssigned;

	@Column(name = "status", columnDefinition = "BOOLEAN")
	private boolean status;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createDate", nullable = false)
	private Date createDate;
}
