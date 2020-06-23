package greenfield.group.com.menuservice.repository;

import greenfield.group.com.menuservice.repository.model.MenuDescriptor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface that extends {@link JpaRepository} for class {@link MenuDescriptor}.
 *
 * @author Ivanov Roman
 * @version 1.0
 */
@Repository
public interface MenuRepository extends JpaRepository<MenuDescriptor, Long> {

    MenuDescriptor findByRoleName(String roleName);

}