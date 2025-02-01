package com.app.services;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.CarDto;
import com.app.dto.CardDto;
import com.app.dto.LoginForm;
import com.app.dto.ParkingDetailsDto;
import com.app.dto.ParkingDetailsPaymentDto;
import com.app.dto.PaymentDto;
import com.app.dto.UserDto;
import com.app.dto.UserDtoUpdate;
import com.app.pojos.CarDetails;
import com.app.pojos.CardDetails;
import com.app.pojos.FeedBack;
import com.app.pojos.ParkingArea;
import com.app.pojos.ParkingDetails;
import com.app.pojos.ParkingSlots;
import com.app.pojos.ParkingZone;
import com.app.pojos.PaymentDetails;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.repositories.*;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ParkingAreaDao parkingAreaDao;
	
	@Autowired
	private ParkingZoneDao parkingZoneDao;
	
	@Autowired
	private ParkingSlotDao parkingSlotDao;
	
	@Autowired
	private com.app.repositories.CarDao carDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private CardDao cardDao;
	
	@Autowired
	private ParkingDetailsDao parkingDetailsDao;
	
	@Autowired
	private PaymentDao paymentDao;
	
	@Autowired
	private PasswordEncoder encoder;
	 @PersistenceContext
	    private EntityManager entityManager;
	@Override
	public User authenitcateUser(String email) {
		
		return userDao.findByEmail(email)
				.orElseThrow(()-> new RuntimeException("Invalid Email"));
	}

	@Override
	public User registerUser(UserDto userDto) {
		
		userDto.setRole(Role.ROLE_USER);
		userDto.setPassword(encoder.encode(userDto.getPassword()));
		User user = modelMapper.map(userDto, User.class);
		return userDao.save(user);
	}

	@Override
	public List<ParkingArea> showAllArea() {
		return parkingAreaDao.findAll();
	}
	 
	
	@Override
	public void deleteCarDetails(int userId, int carId) {
		
		User user = userDao.findById(userId)
				.orElseThrow(()-> new RuntimeException("User ID is invalid"));
		CarDetails car = carDao.findById(carId)
				.orElseThrow(()-> new RuntimeException("Car ID is invalid"));
		carDao.delete(car);
	}

	@Override
	public List<ParkingZone> getSlectedAreaParkingZone(int areaId) {
		ParkingArea area = parkingAreaDao.findById(areaId)
				.orElseThrow(()-> new RuntimeException("Area ID is invalid"));
		
		List<ParkingZone> zones = area.getZones();
		System.out.println(zones.size());
		return zones;
	}
	
	
	@Override
	public List<ParkingSlots> getSelectedZoneParkingSlots(int zoneId) {
		ParkingZone zone = parkingZoneDao.findById(zoneId)
				.orElseThrow(()-> new RuntimeException("Zone ID is invalid"));
		
		List<ParkingSlots> slots = zone.getSlots();
		return slots;
	}

	//Add car details
	@Override
	public CarDetails addCarDetails(int userId, CarDto carDto) {
		System.out.println(carDto.getCarType());
		User user = userDao.findById(userId)
				.orElseThrow(()-> new RuntimeException("User ID is invalid"));
		
		CarDetails car= modelMapper.map(carDto, CarDetails.class);
		List<CarDetails> cars = user.getCars();
		cars.add(car);
		user.setCars(cars);
		user.addCar(car);
		return carDao.save(car);
	}
	
	//Add debit card details
	@Override
	public CardDetails addCardDetails(CardDto cardDto) {
		CardDetails cardToBeAdded = modelMapper.map(cardDto, CardDetails.class);
		User user = modelMapper.map(userDao.findById(cardDto.getUserId()), User.class);
		user.setCard(cardToBeAdded);
		cardToBeAdded.setUser(user);
		return cardDao.save(cardToBeAdded);
	}

	//Delete debit card details
	@Override
	public void deleteCard(int userId, int cardId) {
		User user = userDao.findById(userId)
				.orElseThrow(()-> new RuntimeException("User ID is invalid"));
		CardDetails card = cardDao.findById(cardId)
				.orElseThrow(()-> new RuntimeException("Card ID is invalid"));
		user.setCard(null);;
		cardDao.delete(card);
	}
	
	//update user
	@Override
	public UserDtoUpdate updateUserDetails(int id, UserDtoUpdate userDto) {
		
		User user = userDao.findById(id)
				.orElseThrow(() -> new RuntimeException("Invalid user id : updation failed !!!"));
	
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setMobileNo(userDto.getMobileNo());
		user.setEmail(user.getEmail());
		user.setPassword(user.getPassword());
		user.setAadharNo(user.getAadharNo());
		user.setRole(user.getRole());
		User updatedUser = userDao.save(user);
		UserDtoUpdate updateduserDto = modelMapper.map(updatedUser, UserDtoUpdate.class);
		return updateduserDto;
	}
	

		//Book parking
	@Override
	public ParkingDetails bookParking(ParkingDetailsDto parkingDetailsDto) {

        ParkingArea area = parkingAreaDao.findById(parkingDetailsDto.getAreaId())
                .orElseThrow(() -> new RuntimeException("Invalid AreaId"));

        Duration duration = Duration.between(parkingDetailsDto.getFromDate(), parkingDetailsDto.getToDate());
        double hours = Math.max(1, duration.toHours());
        double price = area.getRate() * hours;
        parkingDetailsDto.setTotalAmt(price);

        ParkingZone zone = parkingZoneDao.findById(parkingDetailsDto.getZoneId())
                .orElseThrow(() -> new RuntimeException("Invalid ZoneId"));

        if (zone.getAvailSlots() <= 0) {
            throw new RuntimeException("No available slots in this zone");
        }
        zone.setAvailSlots(zone.getAvailSlots() - 1);
        parkingZoneDao.save(zone);

        User user = userDao.findById(parkingDetailsDto.getUserId())
                .orElseThrow(() -> new RuntimeException("Invalid UserId"));

        // Detach user to prevent unintended changes
        entityManager.detach(user);

        ParkingSlots slot = parkingSlotDao.findById(parkingDetailsDto.getSlotId())
                .orElseThrow(() -> new RuntimeException("Invalid SlotId"));

        if (slot.isOccupied()) {
            throw new RuntimeException("Slot already occupied");
        }

        slot.setOccupied(true);
        parkingSlotDao.save(slot);

        ParkingDetails parkingDetails = new ParkingDetails();
        parkingDetails.setFromDate(parkingDetailsDto.getFromDate());
        parkingDetails.setToDate(parkingDetailsDto.getToDate());
        parkingDetails.setTotalAmt(parkingDetailsDto.getTotalAmt());
        parkingDetails.setAreaId(parkingDetailsDto.getAreaId());
        parkingDetails.setZoneId(parkingDetailsDto.getZoneId());
        parkingDetails.setSlotId(parkingDetailsDto.getSlotId());
        parkingDetails.setUser(user); // Reference only, no changes to user entity

        return parkingDetailsDao.save(parkingDetails);
    }

		@Override
		public UserDto finfUserById(int userId) {
			User user = userDao.findById(userId)
					.orElseThrow(()-> new RuntimeException("Invalid User Id"));
			
			UserDto userDto = modelMapper.map(user, UserDto.class);
			return userDto;
		}

		@Override
		public ParkingDetailsDto getParkingDetails(Integer userId) {
			User user = userDao.findById(userId)
					.orElseThrow(()-> new RuntimeException("Invalid User id"));
			
			ParkingDetails parkingDetails = parkingDetailsDao.findByUser(user);
			
			ParkingDetailsDto parkingDto = modelMapper.map(parkingDetails, ParkingDetailsDto.class);
			
			return parkingDto;
		}

		@Override
		public Integer findUserId(String userName) {
			User user = userDao.findByEmail(userName)
					.orElseThrow(()-> new RuntimeException("Invalid Email"));
			
			return user.getUserId();
		}

}
