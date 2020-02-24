package greenfield.group.com.services.crud;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import java.util.List;

public interface Repository<T extends PanacheEntityBase> {
    List<T> create(T model);

    List<T> delete(T model);

    List<T> update(T model);

    List<T> findAll();
}
