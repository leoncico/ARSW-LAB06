/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BluePrintFilter;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

/**
 *
 * @author hcadavid
 */
@Service
public class BlueprintsServices {
   
    @Autowired
    private BlueprintsPersistence bpp;

    @Autowired
    private BluePrintFilter bpf;

    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException{
        bpp.saveBlueprint(bp);
    }
    
    public void addNewBlueprint(String author, String name, int[][]points) throws BlueprintPersistenceException{
        Blueprint blueprint= new Blueprint(author, name, points);
        bpp.saveBlueprint(blueprint);
    }


    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException{
        return bpp.getAllBlueprints();
    }
    /**
     * 
     * @param author blueprint's author
     * @param name blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String name) throws BlueprintNotFoundException{
        Blueprint blueprint = bpp.getBlueprint(author, name);
        //bpf.filter(blueprint);
        return blueprint;
    }
    
    /**
     * 
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException{
        Set<Blueprint> blueprint= bpp.getBlueprintsByAuthor(author);
        Set<Blueprint> blueprintFilter= new HashSet<>();
        // for(Blueprint i: blueprint){
        //     bpf.filter(i);
        //     blueprintFilter.add(i);
        // }
        
        return blueprint;
    }

    public void updateBlueprint(String author, String name, Blueprint bp) throws BlueprintNotFoundException{
        Blueprint blueprint = bpp.getBlueprint(author, name);
        bpp.updateBlueprint(blueprint, bp.getPoints());
    }
    
}
