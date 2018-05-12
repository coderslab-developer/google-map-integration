/**
 * 
 */
package com.coderslab.controller.rs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderslab.model.Consignment;
import com.coderslab.model.User;
import com.coderslab.service.AddressService;
import com.coderslab.service.ConsignmentService;
import com.coderslab.service.UserService;

/**
 * @author Zubayer Ahamed
 *
 */
@RestController
@RequestMapping("/map")
public class MapRsController {

	private static final Logger logger = Logger.getLogger(MapRsController.class);

	@Autowired
	private ConsignmentService consignmentService;
	@Autowired
	private UserService userService;
	@Autowired
	private AddressService addressService;

	@RequestMapping("/map")
	public Map<String, Object> getMapDetails() {
		Map<String, Object> map = new HashMap<>();

		List<Consignment> consignments = consignmentService.findAll();
		for (Consignment c : consignments) {
			c.setDriver(userService.findOne(c.getUserId()));
			c.setCollectionAddress(addressService.findOne(c.getCollectionAddressId()));
			c.setDeliveryAddress(addressService.findOne(c.getDeliveryAddressId()));
		}

		List<User> users = userService.findAll();

		map.put("job", consignments);
		map.put("driver", users);

		logger.info("Consignments : " + consignments + ", \nDrivers : " + users);
		return map;
	}

}
