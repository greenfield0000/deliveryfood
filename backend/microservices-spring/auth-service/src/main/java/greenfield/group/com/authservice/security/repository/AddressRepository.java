package greenfield.group.com.authservice.security.repository;

import greenfield.group.com.authservice.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

// Пока отключил, т.к. с этим работать рановато
//@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}
