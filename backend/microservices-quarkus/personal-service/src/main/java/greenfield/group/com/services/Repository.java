package greenfield.group.com.services;

import java.util.List;

public interface Repository<T> {

    void create(T model);

    boolean delete(T model);

    T update(T model);

    List<T> findAll();

    boolean isFindByUUID(String UUID);

    void initEntityManager();

}
