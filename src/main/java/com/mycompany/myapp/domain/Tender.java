package com.mycompany.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Tender.
 */
@Entity
@Table(name = "tender")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tender implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "item_info")
    private byte[] itemInfo;

    @Column(name = "item_info_content_type")
    private String itemInfoContentType;

    @OneToMany(mappedBy = "supplierResponse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Supplier> tenderResponses = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Tender title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Tender description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getItemInfo() {
        return itemInfo;
    }

    public Tender itemInfo(byte[] itemInfo) {
        this.itemInfo = itemInfo;
        return this;
    }

    public void setItemInfo(byte[] itemInfo) {
        this.itemInfo = itemInfo;
    }

    public String getItemInfoContentType() {
        return itemInfoContentType;
    }

    public Tender itemInfoContentType(String itemInfoContentType) {
        this.itemInfoContentType = itemInfoContentType;
        return this;
    }

    public void setItemInfoContentType(String itemInfoContentType) {
        this.itemInfoContentType = itemInfoContentType;
    }

    public Set<Supplier> getTenderResponses() {
        return tenderResponses;
    }

    public Tender tenderResponses(Set<Supplier> suppliers) {
        this.tenderResponses = suppliers;
        return this;
    }

    public Tender addTenderResponse(Supplier supplier) {
        this.tenderResponses.add(supplier);
        supplier.setSupplierResponse(this);
        return this;
    }

    public Tender removeTenderResponse(Supplier supplier) {
        this.tenderResponses.remove(supplier);
        supplier.setSupplierResponse(null);
        return this;
    }

    public void setTenderResponses(Set<Supplier> suppliers) {
        this.tenderResponses = suppliers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Tender tender = (Tender) o;
        if (tender.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tender.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tender{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", itemInfo='" + getItemInfo() + "'" +
            ", itemInfoContentType='" + getItemInfoContentType() + "'" +
            "}";
    }
}
