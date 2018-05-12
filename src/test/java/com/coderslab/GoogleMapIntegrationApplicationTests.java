package com.coderslab;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.log4j.Logger;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.coderslab.enums.UserType;
import com.coderslab.enums.VehicleType;
import com.coderslab.model.Address;
import com.coderslab.model.Consignment;
import com.coderslab.model.User;
import com.coderslab.service.AddressService;
import com.coderslab.service.ConsignmentService;
import com.coderslab.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GoogleMapIntegrationApplicationTests {

	private static final Logger logger = Logger.getLogger(GoogleMapIntegrationApplicationTests.class);
	private static final Map<String, List<String>> addressLists = new HashMap<>();
	private static final Map<String, List<String>> driversList = new HashMap<>();

	@Autowired
	private AddressService addressService;
	@Autowired
	private UserService userService;
	@Autowired
	private ConsignmentService consignmentService;

	@BeforeClass
	public static void doSomeInitialization() {
		List<String> dhaka = new ArrayList<>();
		dhaka.add("23.8103");
		dhaka.add("90.4125");
		addressLists.put("Dhaka", dhaka);

		List<String> comilla = new ArrayList<>();
		comilla.add("23.4607");
		comilla.add("91.1809");
		addressLists.put("Comilla", comilla);

		List<String> sylhet = new ArrayList<>();
		sylhet.add("24.8949");
		sylhet.add("91.8687");
		addressLists.put("Sylhet", sylhet);

		List<String> khulna = new ArrayList<>();
		khulna.add("22.8456");
		khulna.add("89.5403");
		addressLists.put("Khulna", khulna);

		List<String> rajshahi = new ArrayList<>();
		rajshahi.add("24.3636");
		rajshahi.add("88.6241");
		addressLists.put("Rajshahi", rajshahi);

		List<String> mirpur = new ArrayList<>();
		mirpur.add("25.947984");  //25.947984, 88.974323
		mirpur.add("88.974323");
		driversList.put("Mirpur", mirpur);

		List<String> keranigonj = new ArrayList<>();
		keranigonj.add("24.851366");
		keranigonj.add("90.935383");
		driversList.put("Keranigonj", keranigonj);

		List<String> jessore = new ArrayList<>();
		jessore.add("23.162313");  //23.162313, 89.168808
		jessore.add("89.168808");
		driversList.put("Jessore", jessore);

		List<String> chittagonj = new ArrayList<>();
		chittagonj.add("22.354406");  //22.354406, 91.804080
		chittagonj.add("91.804080");
		driversList.put("Chittagong", chittagonj);
	}

	@Test
	public void contextLoads() {
		logger.info("Test started");
	}

	@Test
	public void testCreateAddress() {
		Address address = null;
		for (Map.Entry<String, List<String>> map : addressLists.entrySet()) {
			address = new Address();
			address.setCompany("CodersLab");
			address.setCountry("Bangladesh");
			address.setCity(map.getKey());
			address.setLatitude(map.getValue().get(0));
			address.setLongitude(map.getValue().get(1));
			System.out.println(address);
			addressService.save(address);
		}
	}

	@Test
	public void testGetAllAddress() {
		addressService.findAll().stream().forEach(a -> System.out.println(a.toString()));
	}

	@Test
	public void testCreateUser() {
		User user = null;
		String alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		int i = 0;
		for (Map.Entry<String, List<String>> map : driversList.entrySet()) {
			user = new User();
			user.setUserName("User " + alphabets.charAt(i++));
			user.setUserType(UserType.DRIVER.name());
			user.setVehicleType(VehicleType.VAN.name());
			user.setStatus(true);
			user.setLatitude(map.getValue().get(0));
			user.setLongitude(map.getValue().get(1));
			System.out.println(user.toString());
			userService.save(user);
		}
	}

	@Test
	public void testGetAllUser() {
		userService.findAll().stream().forEach(d -> System.out.println(d.toString()));
	}

	@Test
	public void testCreateConsignment() {
		Consignment consignment = new Consignment();
		consignment.setHawbNumber("EX" + generateKey());
		consignment.setUserId(1); // 1-4
		consignment.setCollectionAddressId(4);
		consignment.setDeliveryAddressId(1);
		consignment.setDelivered(false);
		consignment.setDriverAssigned(false);
		consignment.setReceived(false);
		consignment.setStatus(true);
		consignment.setCreateDate(new Date());
		System.out.println(consignment.toString());
		consignmentService.save(consignment);
	}

	@Test
	public void testGetConsignment() {
		List<Consignment> consignments = consignmentService.findAll();
		for (Consignment c : consignments) {
			c.setDriver(userService.findOne(c.getUserId()));
			c.setCollectionAddress(addressService.findOne(c.getCollectionAddressId()));
			c.setDeliveryAddress(addressService.findOne(c.getDeliveryAddressId()));
		}

		consignments.stream().forEach(c -> System.out.println(c.toString()));
	}

	public String generateKey() {
		String firstDigit = String.valueOf(Math.abs(new Random().nextLong()));
		SimpleDateFormat sdf = new SimpleDateFormat("ddMMyyyyHHmmss");
		return firstDigit + sdf.format(new Date()) + Math.abs(new Random().nextInt(100));
	}
}
