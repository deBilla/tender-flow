package com.mycompany.myapp.web.rest;
import com.mycompany.myapp.domain.Supplier;
import com.mycompany.myapp.service.SupplierService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Supplier.
 */
@RestController
@RequestMapping("/api")
public class SupplierResource {

    private final Logger log = LoggerFactory.getLogger(SupplierResource.class);

    private static final String ENTITY_NAME = "supplier";

    private final SupplierService supplierService;

    public SupplierResource(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    /**
     * POST  /suppliers : Create a new supplier.
     *
     * @param supplier the supplier to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supplier, or with status 400 (Bad Request) if the supplier has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/suppliers")
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier) throws URISyntaxException {
        log.debug("REST request to save Supplier : {}", supplier);
        if (supplier.getId() != null) {
            throw new BadRequestAlertException("A new supplier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Supplier result = supplierService.save(supplier);
        return ResponseEntity.created(new URI("/api/suppliers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /suppliers : Updates an existing supplier.
     *
     * @param supplier the supplier to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supplier,
     * or with status 400 (Bad Request) if the supplier is not valid,
     * or with status 500 (Internal Server Error) if the supplier couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/suppliers")
    public ResponseEntity<Supplier> updateSupplier(@RequestBody Supplier supplier) throws URISyntaxException {
        log.debug("REST request to update Supplier : {}", supplier);
        if (supplier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Supplier result = supplierService.save(supplier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supplier.getId().toString()))
            .body(result);
    }

    /**
     * GET  /suppliers : get all the suppliers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of suppliers in body
     */
    @GetMapping("/suppliers")
    public ResponseEntity<List<Supplier>> getAllSuppliers(Pageable pageable) {
        log.debug("REST request to get a page of Suppliers");
        Page<Supplier> page = supplierService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/suppliers");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /suppliers/:id : get the "id" supplier.
     *
     * @param id the id of the supplier to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supplier, or with status 404 (Not Found)
     */
    @GetMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> getSupplier(@PathVariable Long id) {
        log.debug("REST request to get Supplier : {}", id);
        Optional<Supplier> supplier = supplierService.findOne(id);
        return ResponseUtil.wrapOrNotFound(supplier);
    }

    /**
     * DELETE  /suppliers/:id : delete the "id" supplier.
     *
     * @param id the id of the supplier to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/suppliers/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable Long id) {
        log.debug("REST request to delete Supplier : {}", id);
        supplierService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
