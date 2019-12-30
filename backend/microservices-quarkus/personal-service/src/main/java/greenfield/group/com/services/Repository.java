package greenfield.group.com.services;

import greenfield.group.com.model.User;

import java.util.List;

public interface Repository<T> {

    List<User> create(T model);

    List<User> delete(T model);

    List<User> update(T model);

    List<User> findAll();

    boolean isFindByUUID(String UUID);

    void initEntityManager();

}
