package greenfield.group.com.menuservice.repository;

import api.Menu;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends MongoRepository<Menu, String> {
    List<Menu> findByOwnerRoleIn(String ownerRole);
}
