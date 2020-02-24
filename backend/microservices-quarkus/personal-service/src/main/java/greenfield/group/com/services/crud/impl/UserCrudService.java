package greenfield.group.com.services.crud.impl;

import greenfield.group.com.entity.User;
import greenfield.group.com.services.crud.CrudService;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;


@ApplicationScoped
public class UserCrudService<T extends User> extends CrudService<T> {

    @Override
    public List<T> create(User model) {
        model.id = null;
        model.persist();
        return findAll();
    }

    @Override
    public List<T> delete(User model) {
        if (model != null && model.id != null) {
            User userById = User.findById(model.id);
            if (userById != null) {
                userById.delete();
            }
        }
        return findAll();
    }

    @Override
    public List<T> update(User model) {
        if (model != null && model.id != null) {
            User userById = User.findById(model.id);
            if (userById != null) {
                userById.copy4Update(model);
                userById.persist();
            }
        }
        return findAll();
    }

    @Override
    public List<T> findAll() {
        return User.findAll().list();
    }
}
