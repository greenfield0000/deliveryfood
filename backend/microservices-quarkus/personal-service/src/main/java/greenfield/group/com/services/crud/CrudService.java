package greenfield.group.com.services.crud;

import greenfield.group.com.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Сервис для работы с сущностями
 *
 * @param <T>
 */
@Transactional
public abstract class CrudService<T extends PanacheEntityBase> implements Repository<T> {

    @Override
    public List<T> create(T model) {
        model.persist();
        return findAll();
    }

    @Override
    public List<T> delete(T model) {
        model.delete();
        return findAll();
    }

    @Override
    public List<T> update(T model) {
        model.persist();
        return findAll();
    }

    @Override
    public List<T> findAll() {
        return T.findAll().list();
    }

}

