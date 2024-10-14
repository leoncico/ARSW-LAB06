/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

/**
 *
 * @author hcadavid
 */
@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp=new Blueprint("_authorname_", "_bpname_ ",pts);
        // blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        
        Point[] pts1=new Point[]{new Point(0, 0),new Point(10, 10),new Point(10, 10),new Point(20, 20)};
        Point[] pts2=new Point[]{new Point(20, 0),new Point(0, 20),new Point(0, 30),new Point(0, 40),new Point(0, 50)};
        Point[] pts3=new Point[]{new Point(13, 5),new Point(8, -10)};

        Blueprint bp1=new Blueprint("leo", "miCasita",pts1);
        Blueprint bp2=new Blueprint("leo", "miTiendita",pts2);
        Blueprint bp3=new Blueprint("jeitson", "miLotecito",pts3);

        blueprints.put(new Tuple<>(bp1.getAuthor(), bp1.getName()), bp1);
        blueprints.put(new Tuple<>(bp2.getAuthor(), bp2.getName()), bp2);
        blueprints.put(new Tuple<>(bp3.getAuthor(), bp3.getName()), bp3);
    }
    
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.putIfAbsent(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        Blueprint blueprint= blueprints.get(new Tuple<>(author, bprintname));
        if(blueprint==null){
            throw new BlueprintNotFoundException("No blueprints found for author: " + author + "And name: " + bprintname);
        } 
        return blueprints.get(new Tuple<>(author, bprintname)); 
    }

    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String autor) throws BlueprintNotFoundException{
        Set<Blueprint> blueprintsBy = new HashSet<>();
        for(Blueprint blueprint : blueprints.values()){
            if(blueprint.getAuthor().equals(autor)){
                blueprintsBy.add(blueprint);
            }
        }
        // if(blueprintsBy.isEmpty()){
        //     throw new BlueprintNotFoundException("No blueprints found for author: " + autor);
        // }
        return blueprintsBy;
    }

    @Override
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException{
        Set<Blueprint> AllBlueprints = new HashSet<>();
        for(Blueprint blueprint : blueprints.values()){
            AllBlueprints.add(blueprint);
        }

        if(AllBlueprints.isEmpty()){
            throw new BlueprintNotFoundException("Blueprints not found");
        }
        return AllBlueprints;
    }

    @Override
    public void updateBlueprint(Blueprint blueprint, List<Point> points){
        blueprint.setPoints(points);
    }

    @Override
    public void deleteBlueprint(String author, String bpname) throws BlueprintNotFoundException{
        if (blueprints.containsKey(new Tuple<>(author,bpname))){
            blueprints.remove(new Tuple<>(author, bpname));
        }else{
            throw new BlueprintNotFoundException("No blueprints found for author: " + author + "And name: " + bpname);
        }
    }
}
