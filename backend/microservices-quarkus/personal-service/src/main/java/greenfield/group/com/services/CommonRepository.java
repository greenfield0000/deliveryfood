package greenfield.group.com.services;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional
public class CommonRepository<T> implements Repository<T> {

    @Inject
    EntityManager entityManager;

    @Override
    public void create(T model) {
        entityManager.persist(model);
    }

    @Override
    public boolean delete(T model) {
        entityManager.detach(model);
        return true;
    }

    @Override
    public T update(T model) {
        return entityManager.merge(model);
    }

    @Override
    public List<T> findAll() {
        Query query = entityManager.createQuery("select u from CommonRepository u");
        return query.getResultList();
    }
}
