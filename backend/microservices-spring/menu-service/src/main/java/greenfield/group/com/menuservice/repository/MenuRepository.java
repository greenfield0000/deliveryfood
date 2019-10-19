package greenfield.group.com.menuservice.repository;

import greenfield.group.com.menuservice.Menu;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends MongoRepository<Menu, String> {
//    List<Menu> findByOwnerRoleIn(String ownerRole);
}
